class RemoveTypeFromCategories < ActiveRecord::Migration[7.0]
  def change
    remove_column :categories, :type, :string
  end
end
