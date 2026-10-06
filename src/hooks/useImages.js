import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { listImages, uploadImage, deleteImage } from '@/lib/images';

// Photos for one gallery ("gallery"/"main") or one service page ("service"/<service id>).
export function useImages(type, key) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!key) return;

    let ignore = false;
    setLoading(true);
    listImages(type, key)
      .then(data => { if (!ignore) setImages(data); })
      .catch(err => {
        console.error('Failed to load images:', err);
        if (!ignore) setImages([]);
      })
      .finally(() => { if (!ignore) setLoading(false); });

    return () => { ignore = true; };
  }, [type, key]);

  const upload = async (files) => {
    setUploading(true);
    let added = 0;
    for (const file of files) {
      try {
        const image = await uploadImage(type, key, file);
        setImages(prev => [image, ...prev]);
        added++;
      } catch (err) {
        console.error('Upload failed:', err);
        toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
      }
    }
    setUploading(false);
    if (added > 0) toast({ title: added === 1 ? "Photo added" : `${added} photos added` });
  };

  const remove = async (image) => {
    try {
      await deleteImage(image);
      setImages(prev => prev.filter(i => i.id !== image.id));
    } catch (err) {
      console.error('Delete failed:', err);
      toast({ title: "Delete Failed", description: err.message, variant: "destructive" });
    }
  };

  return { images, loading, uploading, upload, remove };
}
