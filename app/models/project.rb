class Project < ActiveRecord::Base
  has_many :inquired_projects
  has_many :inquirers, through: :inquired_projects
  has_many :stories
end