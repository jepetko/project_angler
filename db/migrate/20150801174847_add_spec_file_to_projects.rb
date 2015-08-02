class AddSpecFileToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :spec_file, :binary
  end
end
