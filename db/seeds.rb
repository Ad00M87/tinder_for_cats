200.times do
  name = Faker::Cat.name
  breed = Faker::Cat.breed
  avatar = Faker::Avatar.image(name, '50x50', 'png', 'set4')
  Cat.create(name: name, breed: breed, avatar: avatar)
end
