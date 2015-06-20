class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :as_a
      t.string :i_want_to
      t.string :so_that
      t.integer :project_id
      t.timestamps
    end
  end
end
