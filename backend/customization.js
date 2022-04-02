const postTypes = ['article', 'poem', 'story', 'microtale']
const languages = ['english', 'hindi']
const categoryOne = ['article', 'poem', 'story']
const categoryTwo = ['microtale']
const categoryOneMandatory = ['title', 'description', 'content', 'language']
const categoryTwoOnly = ['content', 'tags', 'type', 'language']
const categoryOneAllowedUpdates = ['title', 'description', 'content', 'tags', 'language']
const categoryTwoAllowedUpdates = ['content', 'tags', 'language']
const parentMandatory = ['title', 'description']
const parentOnly = ['title', 'description', 'tags']
const parentAllowedUpdates = ['title', 'description', 'tags']
const feedbackAllowedUpdates = ['name', 'feedback']
const removeBadFilter = ['hell', 'sadist', 'hells']

module.exports = {
  postTypes,
  languages,
  categoryOne,
  categoryTwo,
  categoryOneMandatory,
  categoryTwoOnly,
  categoryOneAllowedUpdates,
  categoryTwoAllowedUpdates,
  parentMandatory,
  parentOnly,
  parentAllowedUpdates,
  feedbackAllowedUpdates,
  removeBadFilter
}