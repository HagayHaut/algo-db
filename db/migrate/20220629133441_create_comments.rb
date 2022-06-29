class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :solution_id
      t.text :comment

      t.timestamps
    end
  end
end
