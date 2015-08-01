class ProjectsController < ApplicationController


  def create
    email = inquirer_params[:contact][:email]
    Inquirer.create inquirer_params[:contact] unless Inquirer.exists?(email: email)
    inquirer = Inquirer.find_by email: email
    project = inquirer.projects.build project_params

    if project.save
      @projects = Project.where inquirer: inquirer
      render json: project, include: {stories: {}, inquirer: {}}
    else
      inquirer.reload!
      @projects = []
      render json: project.errors.messages
    end
  end

  def new
    @project = Project.new
  end

  private def inquirer_params
    params.require(:project).permit :contact => [:name, :email, :phone, :company]
  end

  private def project_params
    params.require(:project).permit :budget, :go_live, :description, :stories => [:as_a, :i_want, :so_that]
  end
end