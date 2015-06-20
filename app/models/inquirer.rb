class Inquirer < ActiveRecord::Base
  has_many :projects, -> { order('created_at desc') }
  validates_presence_of :company
  validates_presence_of :name
  validates_presence_of :email
end