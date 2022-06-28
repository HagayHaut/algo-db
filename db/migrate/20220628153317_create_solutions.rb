class CreateSolutions < ActiveRecord::Migration[7.0]
  def change
    create_table :solutions do |t|
      t.integer :user_id
      t.integer :challenge_id
      t.text :solution
      t.string :time_complexity
      t.string :space_complexity
      t.text :notes

      t.timestamps
    end
  end
end
