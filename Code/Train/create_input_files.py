from utils import create_input_files

if __name__ == '__main__':
    # Create input files (along with word map)
    create_input_files(dataset='flickr8k',
                       karpathy_json_path='/home/noha/Downloads/a-PyTorch-Tutorial-to-Image-Captioning-master/caption_datasets/dataset_flickr8k.json',
                       image_folder='/home/noha/Downloads/145129_343604_upload_Flickr_Data/Flickr_Data/Images',
                       captions_per_image=5,
                       min_word_freq=4,
                       output_folder='/home/noha/Downloads/a-PyTorch-Tutorial-to-Image-Captioning-master/generated_data/',
                       max_len=100)
