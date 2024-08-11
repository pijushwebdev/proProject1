import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    //
    search(searchableFields: string[]) {
        const searching = this?.query?.searching;
        if (searching) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searching, $options: 'i' }
                }) as FilterQuery<T>)
            });
        }
        return this;
    }
    //
    filter(){
        const copyQuery = { ...this.query };

        const excludeFields = ['searching', 'sort', 'limit', 'page', 'fields'];
        excludeFields.map((field) => delete copyQuery[field]);

        this.modelQuery = this.modelQuery.find(copyQuery as FilterQuery<T>);

        return this;
    }
    //
    sort(){
        const sortQuery = this?.query?.sort as string;
        const sort = sortQuery ? sortQuery?.split(',').join(' ') : '-createdAt';
        
        this.modelQuery = this.modelQuery.sort(sort as string)
        return this;
    }
    //
    paginate(){
        const page = Number(this?.query?.page) || 1;
        const limit= Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;
        
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    //
    // fieldLimit(){
    //     const fieldsQuery = this?.query?.fields as string;
    //     const fields = fieldsQuery ? fieldsQuery?.split(',')?.join(' ') : '-__v';

    //     this.modelQuery = this.modelQuery.select(fields);
    //     return this;
    // }
    //
    fields() {
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    
        this.modelQuery = this.modelQuery.select(fields);
        return this;
      }
      //
      async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const totalPage = Math.ceil(total / limit);
    
        return {
          page,
          limit,
          total,
          totalPage,
        };
      }
      //

}

export default QueryBuilder;