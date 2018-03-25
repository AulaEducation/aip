class FilterAdapter {
  constructor(options) {
    this.options = options;
    this.customFilter = options.customFilter;
  }

  // eslint-disable-next-line
  filter(user) {
    if (!user) {
      return null;
    }

    if (this.customFilter && typeof this.customFilter === 'function') {
      return this.customFilter(user);
    }

    return {
      authorized: !!user.authorized,
      id: user.id,
    }; // false when undefined
  }
}

export default FilterAdapter;
