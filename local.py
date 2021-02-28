import requests

# resp_get = requests.get('https://dry-forest-93247.herokuapp.com/api/contactos').json()


# for i in range(len(resp_get)):
#   print(resp_get[i]['email'])
  
data = {
  'nombre': 'Florindaaaaaaaaaaaaaaaaaaa!!!!',
  'email': 'florinda@asdfasd.asdf'
}

resp_post = requests.post('https://dry-forest-93247.herokuapp.com/api/contactos', data=data )
print(resp_post.text)