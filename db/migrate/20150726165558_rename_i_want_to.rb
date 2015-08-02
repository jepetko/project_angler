class RenameIWantTo < ActiveRecord::Migration
  def change
    rename_column :stories, :i_want_to, :i_want
  end
end
