class Cat < ApplicationRecord
  def self.random_cats(ids)
    liked = ids.any? ? ids : [0]
    where("id NOT IN (?)", liked).order("RANDOM()")
  end

  def self.liked(ids)
    liked = ids.any? ? ids : [0]
    where("id IN (?)", liked)
  end
end

# one method to give back unliked cats in random order
# another method to give back all liked cats 
