class InquiredProject < ActiveRecord::Base
  belongs_to :project
  belongs_to :inquirer
end