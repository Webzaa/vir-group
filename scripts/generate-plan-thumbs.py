import os
from PIL import Image

PLAN_DIRS = [
    'public/media/projects/Enclave/plans',
    'public/media/projects/krishna-koy/plans',
    'public/media/projects/paradise/plan'
]

def generate_thumbnails():
    for d in PLAN_DIRS:
        if not os.path.exists(d):
            continue
        thumbs_dir = os.path.join(d, 'thumbs')
        os.makedirs(thumbs_dir, exist_ok=True)
        for f in os.listdir(d):
            src_path = os.path.join(d, f)
            if not os.path.isfile(src_path):
                continue
            ext = os.path.splitext(f)[1].lower()
            if ext not in ['.jpg', '.jpeg', '.png', '.webp']:
                continue
            base_name = os.path.splitext(f)[0]
            out_path = os.path.join(thumbs_dir, base_name + '.webp')
            if os.path.exists(out_path):
                continue
            try:
                im = Image.open(src_path)
                im.thumbnail((700, 700), Image.Resampling.LANCZOS)
                if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                    im.save(out_path, 'WEBP', quality=82, method=4)
                else:
                    im = im.convert('RGB')
                    im.save(out_path, 'WEBP', quality=82, method=4)
                print(f"Created: {out_path} ({round(os.path.getsize(out_path)/1024)} KB)")
            except Exception as e:
                print(f"Error processing {src_path}: {e}")

if __name__ == '__main__':
    generate_thumbnails()

