class Project < ActiveRecord::Base
  belongs_to :inquirer
  has_many :stories
  validates_presence_of :budget
  validates_presence_of :description
  validates_presence_of :inquirer
end