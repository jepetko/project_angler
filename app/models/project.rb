class Project < ActiveRecord::Base
  belongs_to :inquirer
  has_many :stories
  validates_presence_of :budget
  validates_presence_of :description
  validates_presence_of :inquirer

  def stories=(stories)
    if stories.first.instance_of? ActionController::Parameters
      stories.each do |story_params|
        story = self.stories.build story_params.to_hash
        story.save!
      end
    end
  end

end