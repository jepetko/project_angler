class ProjectsController < ApplicationController


  def create
    project = nil
    begin
      ActiveRecord::Base.transaction do
        email = inquirer_params[:contact][:email]
        inquirer = Inquirer.new inquirer_params[:contact]
        inquirer.save! unless Inquirer.exists?(email: email)
        inquirer = Inquirer.find_by email: email
        project = inquirer.projects.build project_params

        if project.save!
          render json: project, include: {stories: {}, inquirer: {}}
        end
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: project.errors.messages
    rescue Exception => e
      render json: {exception: e.message}
    end
  end

  def new
    @project = Project.new
  end

  private def inquirer_params
    params.require(:project).permit :contact => [:name, :email, :phone, :company]
  end

  private def project_params
    params.require(:project).permit :budget, :go_live, :description, :spec_file, :stories => [:as_a, :i_want, :so_that]
  end
end