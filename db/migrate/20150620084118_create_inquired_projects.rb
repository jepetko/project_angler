class CreateInquiredProjects < ActiveRecord::Migration
  def change
    create_table :inquired_projects do |t|
      t.integer :project_id
      t.integer :inquirer_id
      t.timestamps
    end
  end
end
