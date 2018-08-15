from PIL import Image
from collections import Counter
from sklearn.cluster import KMeans

im = Image.open('./flower.jpg') 
pix = im.load()
pix_val = list(im.getdata())

kmeans = KMeans(n_clusters = 12)
y_kmeans = kmeans.fit_predict(pix_val)

for center in kmeans.cluster_centers_:  
    print("CENTER IS ", type(center))
    color = (int(center[0]), int(center[1]), int(center[2]))
    img = Image.new('RGB', (300, 200), color)
    img.show()

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
