from PIL import Image, ImageDraw
from sklearn.cluster import KMeans
from collections import Counter
import numpy as np
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

def load_image(path):
    im = Image.open(path) 
    pix_val = np.array(list(im.getdata()))
    return im.size, pix_val

def cluster(pixels, num_clusters):
    kmeans = KMeans(n_clusters = num_clusters)
    y_kmeans = kmeans.fit_predict(pixels)
    return y_kmeans, kmeans.cluster_centers_

def find_and_draw_color_categories(cluster_centers, pixel_labels, pixel_values):
    # test_color = ()
    # for idx, center in enumerate(cluster_centers):
    #     color = (int(center[0]), int(center[1]), int(center[2]))
    #     # test_color = color
    #     img = Image.new('RGB', (300, 200), color)
    #     d = ImageDraw.Draw(img)
    #     d.text((10,10), str(idx), fill=(0,0,0))
    #     img.show()

    pix_val_dict = {}
    unique_labels = np.unique(pixel_labels)
    for label in unique_labels:
        indices = np.where(pixel_labels == label)
        pix_val_dict[label] = pixel_values[indices]

    color_dict = {}
    for label, all_rgb_vals in pix_val_dict.items():
        length = len(all_rgb_vals)
        r = int(np.sqrt(np.sum([color[0]**2 for color in all_rgb_vals])/length))
        g = int(np.sqrt(np.sum([color[1]**2 for color in all_rgb_vals])/length))
        b = int(np.sqrt(np.sum([color[2]**2 for color in all_rgb_vals])/length))
        color_dict[label] = (r, g, b)

    for label, color in color_dict.items():
        img = Image.new('RGB', (300, 200), color)
        d = ImageDraw.Draw(img)
        d.text((10,10), str(label), fill=(0,0,0))
        img.show()
    # print(test_color)
    # print(color_dict[3])
    # print(color_dict[3] == test_color)

    
def initialize_data():
    data = np.array([(255,255,255) for d in range(len(pixel_values))])
    return data

def update_data(data, pixel_values, pixel_labels, chosen_number):
    chosen_indices = np.where(pixel_labels == chosen_number)
    data[chosen_indices] = pixel_values[chosen_indices]
    tupled_data = [(d[0], d[1], d[2]) for d in data]
    return tupled_data
        
def initialize_guesses(pixel_labels):
    guesses_remaining = np.unique(pixel_labels)
    return guesses_remaining

def play_game(tupled_data, chosen_number, image_size, guesses_remaining, pixel_labels):
    count_labels = Counter(pixel_labels)
    print(count_labels)
    if chosen_number in guesses_remaining:
        guesses_remaining = np.delete(guesses_remaining, np.where(guesses_remaining == chosen_number))
        image = Image.new("RGB", image_size)
        image.putdata(tupled_data)
        image.show()
        print("REMAINING GUESSES ARE ", guesses_remaining)
        return guesses_remaining
    elif chosen_number not in guesses_remaining:
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

if __name__ == '__main__':
    path = './mms.jpg'
    image_size, pixel_values = load_image(path)
    num_clusters = 8
    pixel_labels, cluster_centers = cluster(pixel_values, num_clusters)
    find_and_draw_color_categories(cluster_centers, pixel_labels, pixel_values)
    data = initialize_data()
    guesses_remaining = initialize_guesses(pixel_labels)
    while len(guesses_remaining) != 0:
        chosen_number = int(input("Pick a number: "))
        tupled_data = update_data(data, pixel_values, pixel_labels, chosen_number)
        guesses_remaining = play_game(tupled_data, chosen_number, image_size, guesses_remaining, pixel_labels)
    if len(guesses_remaining) == 0:
            print("GAME OVER")