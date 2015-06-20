require 'rails_helper'

describe Story do
  it { should respond_to :as_a }
  it { should respond_to :i_want_to }
  it { should respond_to :so_that }
  it { should belong_to :project }
end