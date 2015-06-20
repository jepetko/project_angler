class CreateInquirers < ActiveRecord::Migration
  def change
    create_table :inquirers do |t|
      t.string :company
      t.string :name
      t.string :phone
      t.string :email
      t.timestamps
    end
  end
end
