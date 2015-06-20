Fabricator(:project) do
  budget { Random.new.rand(1000..100000) }
  go_live { Date.today + rand(1..12).months }
  description { Faker::Lorem.sentence(3) }
  inquirer { Fabricate(:inquirer) }
end