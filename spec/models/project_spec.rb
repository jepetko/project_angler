require 'rails_helper'

describe Project do
  it { should respond_to :budget }
  it { should respond_to :description }
  it { should respond_to :go_live }
  it { should have_many :stories }
  it { should have_many :inquirers }
end