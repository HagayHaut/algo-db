# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_220_629_134_426) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'categories', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'challenges', force: :cascade do |t|
    t.string 'title'
    t.text 'description'
    t.integer 'category_id'
    t.string 'external_url'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'comments', force: :cascade do |t|
    t.integer 'solution_id'
    t.text 'comment'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'user_id'
  end

  create_table 'solutions', force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'challenge_id'
    t.text 'solution'
    t.string 'time_complexity'
    t.string 'space_complexity'
    t.text 'notes'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'users', force: :cascade do |t|
    t.string 'username'
    t.string 'password_digest'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
