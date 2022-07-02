class CreateResources < ActiveRecord::Migration[7.0]
  def change
    create_table :resources do |t|
      t.string :title
      t.text :description
      t.integer :resource_category_id
      t.string :external_url
      t.boolean :is_free

      t.timestamps
    end
  end
end
