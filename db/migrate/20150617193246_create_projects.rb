class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :budget
      t.text :description
      t.date :go_live
      t.timestamps
    end
  end
end
