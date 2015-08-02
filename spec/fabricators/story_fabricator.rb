Fabricator(:story) do
  as_a { Faker::Hacker.noun }
  i_want { "to #{Faker::Hacker.verb}" }
  so_that { "I can #{Faker::Hacker.verb}" }
end