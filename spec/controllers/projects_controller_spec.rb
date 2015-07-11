require 'rails_helper'

describe ProjectsController do
  render_views

  let(:inquirer) { Fabricate(:inquirer) }
  let!(:projects) { [ Fabricate(:project, inquirer: inquirer), Fabricate(:project, inquirer: inquirer) ] }

  describe 'GET :new' do
    context 'success' do
      before do
        get :new
      end

      it 'sets a @project instances' do
        expect(assigns(:project)).to be_a(Project)
      end
    end
  end

  describe 'POST :create' do

    context 'success' do

      let(:project) { Fabricate.attributes_for(:project, inquirer: inquirer) }
      before do
        post :create, project: project
      end

      it 'redirects to /projects' do
        expect(response).to redirect_to projects_path
      end

      it 'sets the @projects submitted so far by this inquirer' do
        last_project = Project.last
        expect(assigns(:projects)).to eq(projects + [last_project])
      end
    end

    context 'failure' do

      let(:project) { Fabricate.attributes_for(:project, inquirer: inquirer).merge description: nil }
      before do
        post :create, project: project
      end

      it 'sets @project submitted recently' do
        expect(assigns(:project).attributes).to eq Project.new(project).attributes
        #expect(assigns(:project)).to eq Project.new(project)
      end

      it 'does not save anything' do
        expect(Project.all).to eq projects
      end

      it 'renders the new template' do
        expect(response).to render_template 'projects/new'
      end

      it 'sets error message' do
        expect(flash[:error]).to be
      end
    end

  end

end