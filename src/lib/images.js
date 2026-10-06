import { supabase, NOT_CONFIGURED } from '@/lib/supabase';

const BUCKET = 'images';
const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.85;
const SKIP_COMPRESSION_BELOW = 500 * 1024;

const toImage = (row) => ({
	id: row.id,
	path: row.path,
	url: supabase.storage.from(BUCKET).getPublicUrl(row.path).data.publicUrl,
});

export async function listImages(type, key) {
	if (!supabase) return [];

	const { data, error } = await supabase
		.from('images')
		.select('id, path')
		.eq('type', type)
		.eq('key', key)
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data.map(toImage);
}

export async function uploadImage(type, key, file) {
	if (!supabase) throw new Error(NOT_CONFIGURED);

	const blob = await compressImage(file);
	const ext = blob.type.split('/')[1].replace('jpeg', 'jpg');
	const path = `${type}/${key}/${crypto.randomUUID()}.${ext}`;

	const { error: uploadError } = await supabase.storage
		.from(BUCKET)
		.upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
	if (uploadError) throw uploadError;

	const { data, error } = await supabase
		.from('images')
		.insert({ type, key, path })
		.select('id, path')
		.single();

	if (error) {
		await supabase.storage.from(BUCKET).remove([path]);
		throw error;
	}
	return toImage(data);
}

export async function deleteImage(image) {
	if (!supabase) throw new Error(NOT_CONFIGURED);

	// RLS silently deletes nothing for non-admins, so check that a row actually went away.
	const { data, error } = await supabase.from('images').delete().eq('id', image.id).select('id');
	if (error) throw error;
	if (data.length === 0) throw new Error('You are not allowed to delete this photo.');

	// Row is gone, so the photo is off the site. A leftover file is harmless.
	const { error: storageError } = await supabase.storage.from(BUCKET).remove([image.path]);
	if (storageError) console.warn('Photo removed but its file could not be deleted:', storageError);
}

// Phone photos are often 5–10 MB; shrink them so the free storage/bandwidth goes further
// and the gallery loads fast. GIFs are left alone to keep their animation.
async function compressImage(file) {
	if (file.type === 'image/gif') return file;

	const img = await loadImage(file);
	const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
	if (scale === 1 && file.size < SKIP_COMPRESSION_BELOW && file.type === 'image/jpeg') return file;

	const canvas = document.createElement('canvas');
	canvas.width = Math.round(img.naturalWidth * scale);
	canvas.height = Math.round(img.naturalHeight * scale);

	const ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff'; // JPEG has no transparency; avoid black backgrounds on PNGs
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => (blob ? resolve(blob) : reject(new Error('Could not process image.'))),
			'image/jpeg',
			JPEG_QUALITY
		);
	});
}

function loadImage(file) {
	return new Promise((resolve, reject) => {
		const src = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(src);
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(src);
			reject(new Error(`"${file.name}" is not a supported image (use JPG, PNG, WebP or GIF).`));
		};
		img.src = src;
	});
}
