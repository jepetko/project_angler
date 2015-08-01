class Story < ActiveRecord::Base
  belongs_to :project
  validates_presence_of :as_a
  validates_presence_of :i_want
  validates_presence_of :so_that
end