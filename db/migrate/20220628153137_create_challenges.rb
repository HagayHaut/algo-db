class CreateChallenges < ActiveRecord::Migration[7.0]
  def change
    create_table :challenges do |t|
      t.string :title
      t.text :description
      t.integer :category_id
      t.string :external_url

      t.timestamps
    end
  end
end
