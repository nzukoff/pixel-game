from PIL import Image, ImageDraw
from sklearn.cluster import KMeans, MiniBatchKMeans
from collections import Counter
import numpy as np
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request

app = Flask(__name__)
CORS(app)

pix_values=None
pix_labels=None
pix_list=None
color_options=[]
updated_data=[]
updated_labels = []

images = ['flower_small.jpg','mms_small.jpg','rainbow_mountains_small.jpg','skittles_small.jpg','skydive_small.jpg', 'tucan_small.jpg', 'poppy_small.jpg','worms_small.jpg']
images_counter = 0

@app.route('/load')
def load_image(path = './flower_small.jpg'):
    reset_values()

    global images
    global images_counter
    path = images[images_counter]
    if images_counter == len(images) - 1:
        images_counter = 0
    else:
        images_counter += 1
    
    im = Image.open(path) 
    pix_val = np.array(list(im.getdata()))
    global pix_values
    global pix_list
    pix_list=[]
    for color in pix_val:
        for value in color:
            pix_list.append(int(value))
        pix_list.append(255)
    pix_values = pix_val
    return jsonify(image_size=im.size, pixel_values=pix_list)

@app.route('/options')
def cluster_colors():
    global pix_values
    global pix_labels
    global color_options
    kmeans = MiniBatchKMeans(n_clusters = 15)
    pix_labels = kmeans.fit_predict(pix_values)
    color_options = kmeans.cluster_centers_.astype(int).tolist()
    return jsonify(color_options=color_options)

@app.route('/choose/<choice>')
# @cross_origin(allow_headers=['Content-Type'])
def choose_color(choice):
    global pix_labels
    global pix_list
    global updated_data
    global color_options
    global updated_labels

    choice = int(choice)

    pix_labels_spread = np.repeat(np.array(pix_labels), 4)
    chosen_indices = np.where(pix_labels_spread == choice)
    np_pix_list = np.array(pix_list)

    if len(updated_data) == 0:
        data = np.array([255 for d in range(len(pix_list))])
        data[chosen_indices] = np_pix_list[chosen_indices]
        updated_data = data
        labels_count = update_labels(pix_labels, choice)
    else:
        updated_data[chosen_indices] = np_pix_list[chosen_indices]
        labels_count = update_labels(updated_labels, choice)

    # color_options = [color for (i, color) in enumerate(color_options) if i != int(choice)]
    color_options = [[] if i == choice else color for i, color in enumerate(color_options)]

    print("LABELS COUNT ", labels_count)

    chosen_place = None
    for idx, (key, count) in enumerate(labels_count):
        if key == choice:
            print("PLACE OF CHOICE IS ", idx+1)
            chosen_place = idx

    del labels_count[chosen_place]
    print("CHOICE IS ", choice)
    print("LABELS COUNT ", labels_count)

    return jsonify(pixel_values=updated_data.tolist(), color_options=color_options, chosen_place=chosen_place+1)

def update_labels(label_list, choice):
    global updated_labels
    labels_count = Counter(label_list).most_common()
    updated_labels = [label for label in label_list if label != choice]
    return labels_count

def reset_values():
    global pix_labels
    global pix_list
    global updated_data
    global color_options
    global updated_data
    pix_labels=[]
    pix_list=[]
    updated_data=[]
    color_options=[]
    updated_data=[]


def load_image_server(path = './mms2.jpg'):
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


if __name__ == '__main__':
    path = './mms2.jpg'
    image_size, pixel_values = load_image_server(path)
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