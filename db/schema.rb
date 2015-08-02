# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150801174847) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "inquirers", force: :cascade do |t|
    t.string   "company"
    t.string   "name"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "projects", force: :cascade do |t|
    t.integer  "budget"
    t.text     "description"
    t.date     "go_live"
    t.integer  "inquirer_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.binary   "spec_file"
  end

  create_table "stories", force: :cascade do |t|
    t.string   "as_a"
    t.string   "i_want"
    t.string   "so_that"
    t.integer  "project_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
