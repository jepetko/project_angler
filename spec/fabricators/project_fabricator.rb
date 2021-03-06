Fabricator(:project) do
  budget { Random.new.rand(1000..100000) }
  go_live { Date.today + rand(1..12).months }
  description { Faker::Lorem.sentence(3) }
  spec_file { Faker::Lorem.sentences(10).join(' ') }
end