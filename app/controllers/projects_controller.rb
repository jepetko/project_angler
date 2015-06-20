class ProjectsController < ApplicationController
  def create
    project = Project.new project_params
    if project.save
      @projects = Project.where inquirer: project.inquirer
      redirect_to projects_path
    else
      @projects = []
      @project = project
      flash[:error] = 'Project could not be saved'
      render :new
    end
  end

  private def project_params
    params.require(:project).permit :budget, :go_live, :description, :inquirer_id
  end
end