var sqlMap = {
  user: {
    add: 'insert into eauser(username,password) values (?,?)',
    select_name: 'select * from eauser',
    update_user: 'update eauser set',
    delete_name: 'delete from eauser'
  }
}

module.exports = sqlMap
