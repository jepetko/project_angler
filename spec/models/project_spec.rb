require 'rails_helper'

describe Project do
  it { should respond_to :budget }
  it { should respond_to :description }
  it { should respond_to :go_live }
  it { should have_many :stories }
  it { should belong_to :inquirer }
  it { should validate_presence_of :budget }
  it { should validate_presence_of :description }
  it { should validate_presence_of :inquirer }
end