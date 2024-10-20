npm run build
scp -r dist/* infom@84.247.189.97:/home/infom/htdocs/infom4th.robixe.online/
The error message `#1205 - Lock wait timeout exceeded; try restarting transaction` indicates that the query is waiting for a lock on the `users` table, but the lock is not available within the timeout period. This usually happens when another transaction is holding a lock on the table or the specific row, causing your `DELETE` operation to wait.

### Solutions to Resolve the Issue:

1. **Identify and Kill the Blocking Transaction:**
   - Find the blocking transaction by running:
     ```sql
     SHOW PROCESSLIST;
     ```
   - Look for any transactions that are in the `Locked` or `Waiting for table metadata lock` state. Note the `id` of the blocking query, and then kill it:
     ```sql
     KILL <process_id>;
     ```
   - Replace `<process_id>` with the actual process ID you found.

2. **Increase the Lock Timeout:**
   - If the lock is held by a long-running process, you can try increasing the lock wait timeout.
   ```sql
   SET innodb_lock_wait_timeout = 120;
   ```
   - This sets the timeout to 120 seconds. Adjust the value as needed, and then try running your `DELETE` query again.

3. **Restart the Transaction or Database Service:**
   - If the problem persists, restarting the database service may help clear out any problematic locks. However, this should be done with caution as it can affect other connected clients.

4. **Check for Long-Running Transactions:**
   - Make sure there are no uncommitted long-running transactions holding locks on the table. You can commit or roll back any open transactions to release the locks.

5. **Optimize Your Query:**
   - If you are frequently encountering lock issues, consider optimizing your queries or database design. Indexing the columns involved in the `WHERE` clause can help improve lock management.

Try these steps, and the lock issue should be resolved.