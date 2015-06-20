require 'rails_helper'

describe Inquirer do
  it { should respond_to :company }
  it { should respond_to :name }
  it { should respond_to :phone }
  it { should respond_to :email }
  it { should have_many :projects }
end