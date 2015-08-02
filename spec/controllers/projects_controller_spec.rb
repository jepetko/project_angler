require 'rails_helper'

describe ProjectsController do
  render_views

  describe 'POST :create' do

    let(:inquirer_attributes) { Fabricate.attributes_for(:inquirer) }
    let(:story_attributes) { Fabricate.attributes_for(:story) }
    let(:stories_as_attributes) { 2.times.map { story_attributes } }

    context 'success' do

      let(:project_attributes) do
        Fabricate.attributes_for(:project).merge(contact: inquirer_attributes, stories: stories_as_attributes)
      end

      before do
        post :create, project: project_attributes, format: :json
      end

      it 'creates a project' do
        expect(Project.count).to be 1
      end

      it 'creates the inquirer automatically' do
        expect(Project.last.inquirer).to have_attributes(inquirer_attributes)
      end

      it 'creates the user stories' do
        expect(Project.last.stories.count).to be stories_as_attributes.count
      end

    end

    context 'failure' do

      let(:project_attributes) do
        Fabricate.attributes_for(:project).merge(description: nil, contact: inquirer_attributes, stories: stories_as_attributes)
      end

      before do
        post :create, project: project_attributes, format: :json
      end

      it 'does not save anything' do
        expect(Inquirer.count).to be 0
        expect(Story.count).to be 0
        expect(Project.count).to be 0
      end

      it 'sets error message' do
        expect(JSON.parse(response.body)).to include({'description' => ["can\'t be blank"]})
      end
    end

  end

end