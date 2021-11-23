function Dashboard({userObject}){
    return (
        // Iterate over the userObject's meeting field to display all the meetings for a User
        <div className="Meetings">
            {userObject.meetings.map(meeting => <p>{meeting}</p>)}
      </div>
    );
}

export default Dashboard;