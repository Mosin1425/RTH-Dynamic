"""Generate depth maps for DepthPhoto (src/components/motion/DepthPhoto.jsx).

Usage (from the repo root):
  pip install onnxruntime numpy pillow
  curl -L -o midas-small.onnx https://github.com/isl-org/MiDaS/releases/download/v2_1/model-small.onnx
  python scripts/generate-depth.py midas-small.onnx public/assets/depth public/assets/AI_01.png ...

Writes one grayscale JPG per photo (white = near), same name with a .jpg extension.
Don't commit the .onnx model file.
"""
import sys, os, numpy as np, onnxruntime as ort
from PIL import Image, ImageFilter
model, out_dir = sys.argv[1], sys.argv[2]
sess = ort.InferenceSession(model, providers=['CPUExecutionProvider'])
inp = sess.get_inputs()[0]
print('input', inp.name, inp.shape)
mean = np.array([0.485, 0.456, 0.406], np.float32); std = np.array([0.229, 0.224, 0.225], np.float32)
for path in sys.argv[3:]:
    im = Image.open(path).convert('RGB')
    x = np.asarray(im.resize((256, 256), Image.BICUBIC), np.float32) / 255.0
    x = ((x - mean) / std).transpose(2, 0, 1)[None]
    d = sess.run(None, {inp.name: x})[0].squeeze()
    d = (d - d.min()) / (d.max() - d.min() + 1e-6)          # inverse depth: 1 = near
    W = 960; H = round(im.height * W / im.width)
    dm = Image.fromarray((d * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(3))
    name = os.path.splitext(os.path.basename(path))[0] + '.jpg'
    dm.save(os.path.join(out_dir, name), quality=80)
    print(name, dm.size, os.path.getsize(os.path.join(out_dir, name)))
