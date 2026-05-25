import os
from PIL import Image

def compress_images():
    count = 0
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepath = os.path.join(root, file)
                size_mb = os.path.getsize(filepath) / (1024 * 1024)
                if size_mb > 1.5:  # Files larger than 1.5 MB
                    print(f"Compressing {filepath} ({size_mb:.2f} MB)...")
                    try:
                        with Image.open(filepath) as img:
                            # Resize if it's too huge (e.g. 4K+)
                            max_dim = 1920
                            if img.width > max_dim or img.height > max_dim:
                                ratio = min(max_dim/img.width, max_dim/img.height)
                                new_size = (int(img.width * ratio), int(img.height * ratio))
                                img = img.resize(new_size, Image.Resampling.LANCZOS)
                                print(f"  Resized to {new_size}")
                            
                            # Save back
                            if filepath.lower().endswith('.png'):
                                # Try to optimize PNG without changing format
                                img.save(filepath, 'PNG', optimize=True)
                            else:
                                # Save JPG with quality 80
                                img.save(filepath, 'JPEG', quality=80, optimize=True)
                                
                        new_size_mb = os.path.getsize(filepath) / (1024 * 1024)
                        print(f"  New size: {new_size_mb:.2f} MB")
                        count += 1
                    except Exception as e:
                        print(f"  Error compressing {filepath}: {e}")
    print(f"Compressed {count} images.")

compress_images()
