from PIL import Image, ImageDraw
from sklearn.cluster import KMeans
import numpy as np

im = Image.open('./worms.jpg') 
pix = im.load()
pix_val = np.array(list(im.getdata()))

kmeans = KMeans(n_clusters = 8)
y_kmeans = kmeans.fit_predict(pix_val)

for idx, center in enumerate(kmeans.cluster_centers_):
    color = (int(center[0]), int(center[1]), int(center[2]))
    img = Image.new('RGB', (300, 200), color)
    d = ImageDraw.Draw(img)
    d.text((10,10), str(idx), fill=(0,0,0))
    img.show()

data = np.array([(255,255,255) for d in range(len(pix_val))])
guesses = []
guesses_remaining = np.unique(y_kmeans)
while True:
    chosen_number = int(input("Pick a number: "))
    # if chosen_number not in guesses:
    if chosen_number in guesses_remaining:
        chosen_indices = np.where(y_kmeans == chosen_number)
        data[chosen_indices] = pix_val[chosen_indices]
        tupled_data = [(d[0], d[1], d[2]) for d in data]
        # guesses.append(chosen_number)
        guesses_remaining = np.delete(guesses_remaining, np.where(guesses_remaining == chosen_number))
        image = Image.new("RGB", im.size)
        image.putdata(tupled_data)
        image.show()
        print("REMAINING GUESSES ARE ", guesses_remaining)
    elif chosen_number not in guesses_remaining:
        # print("ALREADY GUESSED THAT")
        print("REMAINING GUESSES ARE ", guesses_remaining)

## CREATES DATA FOR SPECIFIC LABELS
# data = []
# for idx, label in enumerate(y_kmeans):
#     if label == 3 or label == 1 or label == 5:
#         data.append(tuple(pix_val[idx]))
#     else:
#         data.append((255,255,255))

## MOST COMMON COLORS
# color_count = Counter()
# for pix in pix_val:
#     red = pix[0] >> 5
#     green = pix[1] >> 5
#     blue = pix[2] >> 5
#     if (red, green, blue) in color_count:
#         color_count[(red, green, blue)] += 1
#     else:
#         color_count[(red, green, blue)] = 1
# most_common_colors = []
# for cc in color_count.most_common(12):
#     most_common_colors.append((cc[0][0] << 5, cc[0][1] << 5, cc[0][2] << 5))
# print(most_common_colors)
# for color in most_common_colors:    
#     img = Image.new('RGB', (300, 200), color)
#     img.show()
