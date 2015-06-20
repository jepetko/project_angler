class Inquirer < ActiveRecord::Base
  has_many :inquired_projects
  has_many :projects, through: :inquired_projects
end