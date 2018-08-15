from PIL import Image
from collections import Counter
from sklearn.cluster import KMeans
import numpy as np

im = Image.open('./mms.jpg') 
pix = im.load()
pix_val = np.array(list(im.getdata()))

kmeans = KMeans(n_clusters = 12)
y_kmeans = kmeans.fit_predict(pix_val)

# print(y_kmeans)

for center in kmeans.cluster_centers_:  
    color = (int(center[0]), int(center[1]), int(center[2]))
    # img = Image.new('RGB', (300, 200), color)
    # img.show()

data = []
for idx, label in enumerate(y_kmeans):
    if label == 3 or label == 1 or label == 5:
        data.append(tuple(pix_val[idx]))
    else:
        data.append((255,255,255))


# data = np.full(len(y_kmeans),255)
# indices = np.where(y_kmeans == 7)
# print(indices)
# np.put(data, indices, pix_val[indices])

# it = iter(data)
# tupled = list(zip(it, it, it))

# tupled1 = [(data[i], data[i+1], data[i+2]) for d,i in enumerate(data[::2])]
# print("DATA ", data)
# print("TUPLED IS ", len(list(tupled)))


image = Image.new("RGB", im.size)
image.putdata(data)
image.show()

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
