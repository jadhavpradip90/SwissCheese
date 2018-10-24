import cv2
import numpy as np
import os
import requests
import json
final_result=[]
class ImageProcessing :
	def __init__(self):
		self.all_img=[]
		self.indir = "/home/shreya/Desktop/2018-APAC-PUNE-SWISS-CHEESE/ImageProcessing/data"
		self.subscription_key = "b7d826b4fc994b1c837fa2885a99dac9"
		assert self.subscription_key
		self.face_api_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
		self.server_url = 'http://192.168.43.73:8080/push_emotions'

	def result(self,path):
		path_to_file = "../ImageProcessing/data/"+path
		# Read file
		with open(path_to_file, 'rb') as f:
		    data = f.read()

		headers = {'Content-Type': 'application/octet-stream',
		'Ocp-Apim-subscription-Key': self.subscription_key}
		params = {
		    'returnFaceId': 'true',
		    'returnFaceLandmarks': 'false',
		    'returnFaceAttributes': 'age,gender,glasses,' +
		    'emotion'
		}
		try:
			response = requests.post(self.face_api_url, params=params, headers=headers, data=data)
			faces = response.json()
			print("RESPONSE >>>>>> ",faces)
		        
		except:
			print("Connection refused by the server..")
			print("Let me sleep for 5 seconds")
			print("ZZzzzz...")
			time.sleep(5)
			print("Was a nice sleep, now let me continue...")
			
		return faces

	def video_to_img(self):
		# Playing video from file:
		cap = cv2.VideoCapture('/home/shreya/Desktop/UBS Hackathon/Main/EmotionAPI/VID_20180906_181901.mp4')

		try:
		    if not os.path.exists('data'):
			os.makedirs('data')
		except OSError:
		    print ('Error: Creating directory of data')

		currentFrame = 0
		while(True):
		    # Capture frame-by-frame
		    ret, frame = cap.read()
		    if ret == True:
			# Saves image of the current frame in jpg file
				name = './data/frame' + str(currentFrame) + '.jpg'
				print ('Creating...' + name)
				cv2.imwrite(name, frame)

		    	# To stop duplicate images
		    		currentFrame += 1
		    else:
				break

		# When everything done, release the capture
		cap.release()
		cv2.destroyAllWindows()
	
	def run(self):
		for root, dirs, filenames in os.walk(self.indir):
		    for f in filenames:
			self.all_img.append(f)
		self.all_img.sort(key=lambda s: os.path.getmtime(os.path.join(self.indir, s)))
		print "IMG LIST>>>>>",self.all_img
		
		count = 0
		for img in self.all_img:
			#if count < 1:   
			final_result.append(self.result(img))
			#count = count +1
			#else:
			#	break

		print final_result
	def call_api(self,data):
		#with open('result.json','r') as f:
		#	data = json.load(f)
		#print data
		response = requests.post(self.server_url, data=json.dumps(data))
		res = response.json()
		print("RESPONSE >>>>>> ",res)


obj = ImageProcessing()
obj.video_to_img()
obj.run()
print("**********************************************************")
print final_result
obj.call_api(final_result)

