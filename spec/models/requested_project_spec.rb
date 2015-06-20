require 'rails_helper'

describe InquiredProject do
  it { should belong_to :project }
  it { should belong_to :inquirer }
end